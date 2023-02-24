import React from "react";
import {DeckGL} from "@deck.gl/react";
import {TileLayer} from "@deck.gl/geo-layers";
import {BitmapLayer} from "@deck.gl/layers";

const layer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: (props) => {
        const {
            bbox: {west, south, east, north}
        } = props.tile;

        return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north]
        });
    }
});

export default function DeckMap({onChangeView, vState}) {
    return (
        <React.Fragment>
            <DeckGL
                viewState={vState}
                onViewStateChange={(e) => {
                    onChangeView(e.viewState);
                }}
                controller={true}
                width="100%"
                height="500px"
                layers={[layer]}
            >
                <button
                    onClick={() => {
                        onChangeView({
                            longitude: 0,
                            latitude: 51,
                            zoom: 5
                        });
                    }}
                >
                    Reset
                </button>
            </DeckGL>
        </React.Fragment>
    );
}
