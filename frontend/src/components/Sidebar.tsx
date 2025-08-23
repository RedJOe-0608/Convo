import { sidebarIcons } from "../config/sidebarIcons";
import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  return (
    <aside className="flex bg-primary-dark text-white flex-col min-w-[5%] gap-8 h-screen  items-center">
        <h1 className="font-bold text-2xl">Convo</h1>
       {sidebarIcons.map((sidebarIcon) => (
            <SidebarIcon key={sidebarIcon.id} icon={sidebarIcon.icon} title={sidebarIcon.title} />
       ))}
    </aside>
  )
}

export default Sidebar
