import React, { PureComponent } from 'react'
import Svg, {
    G,
    Ellipse,
    Line,
    Path,
    Defs,

} from 'react-native-svg';

export default class SeparatorIcon extends PureComponent {
    render() {
        return (
            <Svg
                width={90}
                height={50}
                
            >
                <G id="Group_12" data-name="Group 12" stroke = "#16a085" transform ="translate(-48.137 -896.552)">
                    <Line id="Line_103" data-name="Line 103"  x2="93.862" transform="translate(48.137 897.052)"/>
                    <Line id="Line_105" data-name="Line 105" y2="43.334" transform="translate(93.658 897.239)"/>
                    <Ellipse id="Ellipse_232" data-name="Ellipse 232"  cx="3.684" cy="3.684" rx="3.684" ry="3.684" transform="translate(90.00 935.55)" />
                </G>
            </Svg>
        )
    }
}

