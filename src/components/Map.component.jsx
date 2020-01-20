import React, {Fragment} from 'react';
import '../App.css';
import DarkSkies from '../data/darkskies';
import MAPBOX_ACCESS_TOKEN from './Token.component';
import initialViewState from './InitialState.component';

//Deckgl imports
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
  
class Map extends React.Component {
  

    _renderTooltip() {
      const {hoveredObject, pointerX, pointerY} = this.state || {};
      return hoveredObject && (
        <div className="tools" style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
         <h4> {hoveredObject.name }</h4>
         <p>City: {hoveredObject.city}<br />
         State/Province/Region: {hoveredObject.state}<br />
         Country: {hoveredObject.country}</p>
         <p>{hoveredObject.description}</p>
        </div>
      );
    }

     

    _Welcome() {
      return (
        <div className="welcome" style={{position: 'absolute', zIndex: 7, padding: '4px', pointerEvents: 'click', left: 3, top: 2}}>
            <h2>Dark Skies</h2>
            <p>To view dark skies information, place the cursor over each point. Hold down the mouse and scroll to move to other parts of the globe. </p>
            <p><a href="https://github.com/nomadicvince/dark_skies" target="_blank" rel="noopener noreferrer">view code on Github</a></p>
        </div>
      );
    }

    render() {
      const layers = [
        new ScatterplotLayer({
          id: 'scatter-plot',
          data: DarkSkies,
          getPosition: d => d.position,
          radiusMinPixels: 0.25,
          getRadius: d => d.radius,
          getFillColor: d => d.type === "Community" ? [255, 0, 0] : [138, 239, 241] &&
          d.type === "Park" ? [0, 255, 0] : [138, 239, 241] && d.type === "Reserve" ? [255, 98, 0] : [138, 239, 241] && d.type === "Sanctuary" ? [255, 255, 0] : [138, 239, 241] && d.type === "Festival" ? [255, 0, 255] : [138, 239, 241],
          getLineColor: [224, 255, 0],
          pickable: true,
          onHover: info => this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y
          })
        })
      ];
  
      return (
        <Fragment>
          <DeckGL
            initialViewState={initialViewState}
            controller={true}
            layers={layers}            
          >
            <StaticMap           
              preventStyleDiffing 
              mapStyle = 'mapbox://styles/vincegalaxy/ck33uktem0k9f1dpn25ytnk7w'
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
            />
          </DeckGL>
          { this._renderTooltip() }
          { this._Welcome() }
        </Fragment>
      );
    }
}

export default Map;