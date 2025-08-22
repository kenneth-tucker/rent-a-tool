import React from "react";

enum BannerState {
    Hidden = 'Hidden',
    Info = 'Info',
    Error = 'Error'
}

interface BannerProps {
    items: React.ReactNode[];
    state: BannerState;
}

function Banner({ items, state }: BannerProps) {
    let renderedItems = [];
    let keyIdx = 0;
    for (let i = 0; i < items.length; i++) {
        renderedItems.push(
            <div key={keyIdx++} className="BannerChild">
                {items[i]}
            </div>
        );
    }
    
    // Banner coloring and visibility depends on state
    return (
    <div className={"Banner" + state} style={
        {visibility: state === BannerState.Hidden ? 'hidden' : 'visible' }}>
        {renderedItems}
    </div>
    )
}

export default Banner;
export { BannerState, Banner };