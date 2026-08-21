import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 CORREÇÃO: Ícones padrão do Leaflet no React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  cityName?: string;
  coordinates?: string;
  zoom?: number;
  height?: string;
  width?: string;
  minHeight?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
  displayName: string;
}

// 🔧 Função CORRIGIDA para converter coordenadas
const convertCoordinatesToDecimal = (coordStr: string): { lat: number; lng: number } | null => {
  try {
    // Remove aspas e espaços extras
    let cleaned = coordStr
      .replace(/["']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    console.log("Coordenada original:", coordStr);
    console.log("Coordenada limpa:", cleaned);
    
    // Divide a string em partes
    const parts = cleaned.split(' ');
    
    // 🔥 CORREÇÃO IMPORTANTE: Identificar corretamente latitude e longitude
    let latPart = '';
    let lngPart = '';
    
    // Primeiro, tenta encontrar pelos indicadores de direção
    for (const part of parts) {
      if (part.includes('S') || part.includes('N')) {
        latPart = part;
      } else if (part.includes('W') || part.includes('E')) {
        lngPart = part;
      }
    }
    
    // Se não encontrou pelos indicadores, tenta pela posição
    if (!latPart && !lngPart) {
      if (parts.length >= 2) {
        // A primeira parte geralmente é latitude, a segunda longitude
        latPart = parts[0];
        lngPart = parts[1];
      } else {
        console.error("Formato inválido: não foi possível separar latitude e longitude");
        return null;
      }
    }
    
    console.log("Latitude parte:", latPart);
    console.log("Longitude parte:", lngPart);
    
    // Função para converter uma coordenada individual
    const convertSingleCoord = (coord: string): number => {
      // Remove N, S, E, W para extrair os números
      const cleanCoord = coord.replace(/[NSWE]/g, '').trim();
      
      console.log("Convertendo:", coord, "-> Limpo:", cleanCoord);
      
      // Tenta encontrar graus, minutos, segundos
      // Aceita: 18°28'18.5" ou 18°28'18.5
      const match = cleanCoord.match(/(\d+)°(\d+)'([\d.]+)/);
      
      if (match) {
        const degrees = parseFloat(match[1]);
        const minutes = parseFloat(match[2]);
        const seconds = parseFloat(match[3]);
        
        let decimal = degrees + minutes / 60 + seconds / 3600;
        
        // 🔥 CORREÇÃO: Verifica se é Sul ou Oeste para tornar negativo
        if (coord.includes('S') || coord.includes('W')) {
          decimal = -decimal;
        }
        
        console.log(`Convertido: ${coord} -> ${decimal}`);
        return decimal;
      }
      
      // Se não encontrar o formato, tenta como decimal
      const decimal = parseFloat(cleanCoord);
      if (!isNaN(decimal)) {
        // Se a coordenada original tem S ou W, torna negativo
        if (coord.includes('S') || coord.includes('W')) {
          return -Math.abs(decimal);
        }
        return decimal;
      }
      
      console.error(`Não foi possível converter: ${coord}`);
      return 0;
    };
    
    const lat = convertSingleCoord(latPart);
    const lng = convertSingleCoord(lngPart);
    
    console.log("Latitude decimal:", lat);
    console.log("Longitude decimal:", lng);
    
    // 🔥 Validação mais rigorosa
    if (isNaN(lat) || isNaN(lng)) {
      console.error("Coordenadas inválidas (NaN)");
      return null;
    }
    
    if (lat < -90 || lat > 90) {
      console.error(`Latitude inválida: ${lat} (deve estar entre -90 e 90)`);
      return null;
    }
    
    if (lng < -180 || lng > 180) {
      console.error(`Longitude inválida: ${lng} (deve estar entre -180 e 180)`);
      return null;
    }
    
    // 🔥 Verificação específica para Brasil (opcional, mas ajuda a detectar erros)
    // Brasil está entre -33° e 5° de latitude e -73° e -34° de longitude
    if (lat < -33 && lat > -34) {
      console.warn("Latitude parece estar no Brasil (Sul)");
    }
    
    if (lng < -73 && lng > -34) {
      console.warn("Longitude parece estar no Brasil (Oeste)");
    }
    
    return { lat, lng };
  } catch (error) {
    console.error("Erro ao converter coordenadas:", error);
    return null;
  }
};

const MapComponent: React.FC<MapComponentProps> = ({
  cityName,
  coordinates: coordinatesProp,
  zoom = 9,
  height = "100%",
  width = "100%",
  minHeight = "200px"
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingCoordinates, setUsingCoordinates] = useState<boolean>(false);

  const geocodeCity = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
        {
          headers: {
            "User-Agent": "MapComponentApp/1.0",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        setCoordinates({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          displayName: result.display_name,
        });
        setUsingCoordinates(false);
      } else {
        throw new Error(`Cidade "${cityName}" não encontrada`);
      }
    } catch (err) {
      throw err;
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: {
            "User-Agent": "MapComponentApp/1.0",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.display_name) {
        setCoordinates({
          lat,
          lng,
          displayName: data.display_name,
        });
        setUsingCoordinates(true);
      } else {
        setCoordinates({
          lat,
          lng,
          displayName: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        });
        setUsingCoordinates(true);
      }
    } catch (err) {
      setCoordinates({
        lat,
        lng,
        displayName: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      });
      setUsingCoordinates(true);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (!coordinatesProp && !cityName) {
        setError("Nome da cidade ou coordenadas não fornecidos");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setCoordinates(null);

      try {
        if (coordinatesProp) {
          console.log("🔍 Processando coordenadas:", coordinatesProp);
          const decimalCoords = convertCoordinatesToDecimal(coordinatesProp);
          
          if (!decimalCoords) {
            throw new Error(`Formato de coordenadas inválido: "${coordinatesProp}". Use: 18°28'18.5S 43°29'51.8W`);
          }
          
          console.log("✅ Coordenadas convertidas:", decimalCoords);
          await reverseGeocode(decimalCoords.lat, decimalCoords.lng);
        } else if (cityName) {
          await geocodeCity(cityName);
        } else {
          throw new Error("Nome da cidade ou coordenadas não fornecidos");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar localização",
        );
        setCoordinates(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [cityName, coordinatesProp]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          Carregando {coordinatesProp ? 'coordenadas' : `mapa de ${cityName}`}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-red-50 rounded-lg border border-red-200"
        style={{ height, width, minHeight }}
      >
        <div className="text-red-600 text-center p-4">
          <p className="font-semibold">⚠️ Erro ao carregar mapa</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2 text-gray-500">
            {coordinatesProp 
              ? "Verifique o formato das coordenadas e tente novamente" 
              : "Verifique o nome da cidade e tente novamente"}
          </p>
        </div>
      </div>
    );
  }

  if (!coordinates) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, width, minHeight }}
      >
        <div className="text-gray-600 text-center">
          <p>Nenhuma coordenada disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ height, width, minHeight }}
      className="rounded-lg overflow-hidden shadow-lg z-10"
    >
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%", minHeight: "200px" }}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <strong>{usingCoordinates ? "📍 Localização" : cityName}</strong>
              <p className="text-sm text-gray-600 mt-1">
                {coordinates.displayName}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;