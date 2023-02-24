import React, {useState} from "react";
import Tiptap from "../TipTap/TipTap";
import DeckMap from "components/DeckMap/DeckMap";
import {InitialViewStateProps} from "@deck.gl/core/lib/deck";

const Home = () => {
    const [slider, setSlider] = useState<number>(0);
    const [vState, setVState] = useState<InitialViewStateProps>({
        zoom: 15,
        longitude: 106.82718034099645,
        latitude: -6.175397968558875,
        pitch: 0,
        bearing: 0
    });

    const onChangeSlider = (e) => {
        setSlider(e.target.value / 100);
    };

    const onClickStamptext = (stamp: string) => {
        setVState(JSON.parse(stamp));
    };

    const onChangeView = (viewState: InitialViewStateProps) => {
        setVState(viewState);
    };

    return (
        <section className="container">
            <h3 className="page-title">TipTap</h3>
            <p className="intro">Click stamp button after selecting a text.</p>

            <div className="map-container">
                <div className="map-wrapper">
                    <DeckMap onChangeView={onChangeView} vState={vState} />
                </div>
                <pre>{JSON.stringify(vState, null, 4)}</pre>
            </div>

            <Tiptap slider={JSON.stringify(vState)} onClickStamptext={onClickStamptext} />

            <div className="stamp-wrapper">
                <label htmlFor="stamp">Stamp: {slider}</label>
                <input
                    type="range"
                    id="stamp"
                    min="0"
                    max="100"
                    value={slider * 100}
                    onChange={onChangeSlider}
                />
            </div>
        </section>
    );
};

export default Home;
