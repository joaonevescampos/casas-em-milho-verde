import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 CORREÇÃO: Ícones padrão do Leaflet no React
// Isso resolve o problema de ícones quebrados no build
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface CityMapProps {
  cityName: string; // Nome da cidade, ex: "Milho Verde, MG" ou "São Paulo, SP"
  zoom?: number; // Zoom opcional (padrão: 11 para mostrar área ampla)
  height?: string; // Altura opcional (padrão: 500px)
  width?: string; // Largura opcional (padrão: 100%)
}

interface Coordinates {
  lat: number;
  lng: number;
  displayName: string;
}

const CityMap: React.FC<CityMapProps> = ({
  cityName,
  zoom = 9,
  height = "100%",
  width = "100%",
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔍 Função de geocodificação usando Nominatim (OpenStreetMap)
  useEffect(() => {
    const geocodeCity = async () => {
      if (!cityName) {
        setError("Nome da cidade não fornecido");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Busca as coordenadas da cidade
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
          {
            headers: {
              "User-Agent": "CityMapApp/1.0", // ⚠️ Identifique seu app para respeitar a política de uso
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
        } else {
          throw new Error(`Cidade "${cityName}" não encontrada`);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar coordenadas",
        );
        setCoordinates(null);
      } finally {
        setLoading(false);
      }
    };

    geocodeCity();
  }, [cityName]);

  // 🎯 Estados de carregamento e erro
  if (loading) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          Carregando mapa de {cityName}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-red-50 rounded-lg border border-red-200"
        style={{ height, width }}
      >
        <div className="text-red-600 text-center p-4">
          <p className="font-semibold">⚠️ Erro ao carregar mapa</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2 text-gray-500">
            Verifique o nome da cidade e tente novamente
          </p>
        </div>
      </div>
    );
  }

  // 🗺️ Renderiza o mapa com as coordenadas obtidas
  if (!coordinates) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-gray-600 text-center">
          <p>Nenhuma coordenada disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ height, width }}
      className="rounded-lg overflow-hidden shadow-lg z-10"
    >
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
      >
        {/* 🗺️ Camada de tiles do OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Marcador na cidade */}
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <strong>{cityName}</strong>
              <p className="text-sm text-gray-600 mt-1">
                {coordinates.displayName}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CityMap;
