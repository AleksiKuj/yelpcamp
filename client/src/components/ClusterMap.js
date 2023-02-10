import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef } from "react"

const ClusterMap = ({ campgrounds }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

  const mapStyle = { width: "100" }

  useEffect(() => {
    if (map.current) return // initialize map only once
    if (campgrounds.length !== 0) {
      setTimeout(() => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: "mapbox://styles/mapbox/streets-v11",
          center: [23.106, 53.578],
          zoom: 3,
        })
        map.current.addControl(new mapboxgl.NavigationControl())

        //add "properties" to each campground for geojson parsing
        let newCampgrounds = campgrounds.map(function (ele) {
          return { ...ele, properties: { title: ele.title, id: ele.id } }
        })

        map.current.on("load", () => {
          // Add a new source from our GeoJSON data and
          // set the 'cluster' option to true. GL-JS will
          // add the point_count property to your source data.

          map.current.addSource("campgrounds", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: { features: newCampgrounds },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
          })

          map.current.addLayer({
            id: "clusters",
            type: "circle",
            source: "campgrounds",
            filter: ["has", "point_count"],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#03A9F4",
                10,
                "#2196F3",
                30,
                "yellow",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15, //pixel size when below 10
                10,
                20, //pixel size when below 30
                30,
                25,
              ],
            },
          })

          map.current.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "campgrounds",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          })

          map.current.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "campgrounds",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#EE4B2B",
              "circle-radius": 5,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            },
          })

          // inspect a cluster on click
          map.current.on("click", "clusters", (e) => {
            const features = map.current.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            })
            const clusterId = features[0].properties.cluster_id
            map.current
              .getSource("campgrounds")
              .getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return

                map.current.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom,
                })
              })
          })

          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          map.current.on("click", "unclustered-point", (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice()

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
            }
            const title = e.features[0].properties.title
            const id = e.features[0].properties.id

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(
                `<b>${title}</b> <br> <a href=/campgrounds/${id}>Go to page</a> `
              )
              .addTo(map.current)
          })

          map.current.on("mouseenter", "clusters", () => {
            map.current.getCanvas().style.cursor = "pointer"
          })
          map.current.on("mouseleave", "clusters", () => {
            map.current.getCanvas().style.cursor = ""
          })
        })
      }, 100)
    }
  })

  return (
    <div>
      <div ref={mapContainer} className="map-container" style={mapStyle} />
    </div>
  )
}
export default ClusterMap
