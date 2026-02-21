let map, marker, circle;

document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const [lng, lat] = JSON.parse(mapDiv.dataset.coordinates);
  const title = mapDiv.dataset.title;

  map = L.map("map").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  });

  marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

  marker.bindTooltip(
    `<strong>${title}</strong><br>
     <span>Exact location provided after booking</span>`,
    {
      direction: "top",
      offset: [0, -25],
      opacity: 1,
      sticky: true,
      className: "airbnb-tooltip",
    }
  );

  circle = L.circle([lat, lng], {
    radius: 700,
    color: "#ff385c",
    fillColor: "#ff385c",
    fillOpacity: 0.15,
    weight: 1,
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 300);
});
