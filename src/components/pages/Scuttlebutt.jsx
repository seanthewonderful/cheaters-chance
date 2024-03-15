import { Outlet } from "react-router-dom"

import NavMenu from "../NavMenu"

const Scuttlebutt = () => {
  return (
    <div>
      <NavMenu />
      <Outlet/>
    </div>
  )
}

export default Scuttlebutt