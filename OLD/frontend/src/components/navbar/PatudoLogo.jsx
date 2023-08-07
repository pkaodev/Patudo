import React from 'react'

export default function PatudoLogo({switchColor, appBGState}) {
  return (
    <div className={`patudo-logo patudo-logo-${appBGState}`} onClick={switchColor}>PATUDO</div>
  )
}

