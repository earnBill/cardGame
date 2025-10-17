import { div } from "framer-motion/client"

export default function Header() {
    return (
        <div className="header">
          <h1 className="header-msg">Pokemon.</h1>
          <p className="intro-msg">A Pokemon Memory Challenge</p>
        </div>
    )
}