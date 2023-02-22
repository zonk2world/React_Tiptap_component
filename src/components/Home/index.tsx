import React, {useState} from "react";
import Tiptap from "../TipTap/TipTap";

const Home = () => {
    const [slider, setSlider] = useState<number>(0);

    const onChangeSlider = (e) => {
        setSlider(e.target.value / 100);
    };

    const onClickStamptext = (stamp: number) => {
        setSlider(stamp);
    };

    return (
        <section className="container">
            <h3 className="page-title">TipTap</h3>
            <p className="intro">Click stamp button after selecting a text.</p>

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

            <Tiptap slider={slider} onClickStamptext={onClickStamptext} />
        </section>
    );
};

export default Home;
