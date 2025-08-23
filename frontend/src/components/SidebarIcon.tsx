

const SidebarIcon = ({icon,title}:{icon:React.ReactNode,title:string}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
        {icon}
       <span className="text-gray-400">{title}</span> 
    </div>
  )
}

export default SidebarIcon
