import React, { useState } from "react";

interface OverlayProps {
    aoFechar: () => void;
}

export function Overlay({aoFechar}: OverlayProps){
    return (
        <div className="fixed inset-0 bg-base-7/50 z-30 md:hidden" onClick={() => aoFechar()}>
        </div>
    )
}