document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const [lng, lat] = JSON.parse(mapDiv.dataset.coordinates);

  const map = L.map("map").setView([lat, lng], 15);//zoom in and out

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // 🔴 Airbnb-style red marker
  const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
  });

  // 📍 Marker
  const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

// show title on hover
marker.bindTooltip(mapDiv.dataset.title, {
  direction: "top",
  offset: [0, -20],
  opacity: 0.9,
  className: "airbnb-tooltip"
});


  // 🟠 Privacy circle (blurred location)
  const circle = L.circle([lat, lng], {
    radius: 700, // meters
    color: "#ff385c",
    fillColor: "#ff385c",
    fillOpacity: 0.15,
    weight: 1
  }).addTo(map);

  // 💬 Tooltip (Airbnb-style message)
  const title = mapDiv.dataset.title;
const tooltipContent = `
  <div>
    <strong>${title}</strong><br>
    <span>Exact location provided after booking</span>
  </div>`;
  marker.bindTooltip(tooltipContent, {
  direction: "top",
  offset: [0, -25],
  opacity: 1,
  sticky: true,
  pane: "tooltipPane",
  className: "airbnb-tooltip"
});

  // Hover behavior
  marker.on("mouseover", function () {
    this.openTooltip();
  });

  marker.on("mouseout", function () {
    this.closeTooltip();
  });

  setTimeout(() => map.invalidateSize(), 300);
});
