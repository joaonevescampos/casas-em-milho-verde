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
  coordinates?: string | null;
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
    
    // 🔥 CORREÇÃO: Extrai latitude e longitude separadamente
    // Procura por padrões como: 18°28'18.5"S ou 18°28'18.5 S
    const latRegex = /(\d+)°(\d+)'([\d.]+)["']?\s*([NS])/i;
    const lngRegex = /(\d+)°(\d+)'([\d.]+)["']?\s*([EW])/i;
    
    let latMatch = coordStr.match(latRegex);
    let lngMatch = coordStr.match(lngRegex);
    
    // Se não encontrou com as aspas, tenta sem
    if (!latMatch) {
      const altLatRegex = /(\d+)°(\d+)'([\d.]+)\s*([NS])/i;
      latMatch = coordStr.match(altLatRegex);
    }
    
    if (!lngMatch) {
      const altLngRegex = /(\d+)°(\d+)'([\d.]+)\s*([EW])/i;
      lngMatch = coordStr.match(altLngRegex);
    }
    
    if (!latMatch || !lngMatch) {
      console.error("❌ Formato não reconhecido. Use: 18°28'18.5\"S 43°29'51.8\"W");
      return null;
    }
    
    // Converte latitude
    const latDeg = parseFloat(latMatch[1]);
    const latMin = parseFloat(latMatch[2]);
    const latSec = parseFloat(latMatch[3]);
    const latDir = latMatch[4].toUpperCase();
    
    let lat = latDeg + latMin / 60 + latSec / 3600;
    if (latDir === 'S') {
      lat = -lat;
    }
    
    // Converte longitude
    const lngDeg = parseFloat(lngMatch[1]);
    const lngMin = parseFloat(lngMatch[2]);
    const lngSec = parseFloat(lngMatch[3]);
    const lngDir = lngMatch[4].toUpperCase();
    
    let lng = lngDeg + lngMin / 60 + lngSec / 3600;
    if (lngDir === 'W') {
      lng = -lng;
    }
    
    if (isNaN(lat) || isNaN(lng)) {
      console.error("❌ Coordenadas inválidas (NaN)");
      return null;
    }
    
    if (lat < -90 || lat > 90) {
      console.error(`❌ Latitude inválida: ${lat} (deve estar entre -90 e 90)`);
      return null;
    }
    
    if (lng < -180 || lng > 180) {
      console.error(`❌ Longitude inválida: ${lng} (deve estar entre -180 e 180)`);
      return null;
    }
  
    return { lat, lng };
  } catch (error) {
    console.error("❌ Erro ao converter coordenadas:", error);
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
          const decimalCoords = convertCoordinatesToDecimal(coordinatesProp);
          
          if (!decimalCoords) {
            throw new Error(`Formato de coordenadas inválido: "${coordinatesProp}". Use: 18°28'18.5S 43°29'51.8W`);
          }
          
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