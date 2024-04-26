import { Outlet } from "react-router-dom"
import sessionCheck from '../../functions/sessionCheck.js'
import NavMenu from "../NavMenu"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const Scuttlebutt = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    sessionCheck(dispatch)
  }, [])

  console.log("Parent rendering")

  return (
    <div>
      <NavMenu />
      <Outlet />
    </div>
  )
}

export default Scuttlebutt