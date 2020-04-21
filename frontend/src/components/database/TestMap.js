import React, { useMemo } from 'react';
import MapGL, { SVGOverlay } from 'react-map-gl';

function SvgOverlayExample({ libraries, radius }) {
    const redraw = ({ project }) => {
        return <g>
            {libraries.map((lib, index) => {
                const [x, y] = project([lib.longitude, lib.latitude]);
                console.log([lib.longitude, lib.latitude])
                return <circle key={index} cx={x} cy={y} r={radius} stroke="rgba(117, 193, 255, 0.3)" strokeWidth="20" fill="#75c1ff" />
            })}
        </g>
    }
    return <SVGOverlay redraw={redraw} />
}

const TestMap = ({width, height, viewState, onViewStateChange, libraries}) => {
    const librariesMass = useMemo(() => libraries.filter(d => d.country === 'India'), [libraries])

    return (
        <MapGL 
            width={width} 
            height={height}
            viewState={viewState}
            onViewStateChange={onViewStateChange}
            mapStyle="mapbox://styles/gisfeedback/cjvod9hc909kh1eo9nj23g33k"
        >
            <SvgOverlayExample libraries={librariesMass} radius={5} />
        </MapGL>
    )
}

export default TestMap;