import React from 'react';
import { useAttribute } from '../context/attribute-context';

const FeatureItem = props => {
    // eslint-disable-next-line
    const [{ attributes }, dispatch] = useAttribute();

    return (
        <div>
            {props.id}
            <button onClick={() => dispatch({
                type: 'deleteFeature',
                did: props.id
            })}>Delete</button>
        </div>
    )

};

const FeatureList = props => {
    return (
        <div>
            {props.items.map(feature => 
                    <FeatureItem 
                        key={feature.id} 
                        id={feature.id}
                    />
                )}
        </div>
    )
}

const AttributeItem = props => {
    // eslint-disable-next-line
    const [{ attributes }, dispatch] = useAttribute();

    return (
        <React.Fragment>
            <div>
                Person
            <div>
            </div>
                {props.id}
                <button onClick={() => dispatch({
                    type: 'addFeature',
                    pid: props.id
                })}>add</button>
            </div>
            <FeatureList items={props.features} />
        </React.Fragment>
    )
}

const AttributeList = props => {
    return (
        <div>
            {props.items.map(attribute => 
                    <AttributeItem 
                        key={attribute.id} 
                        id={attribute.id}
                        features={attribute.features}
                    />
                )}
        </div>
    )
}

export default AttributeList;