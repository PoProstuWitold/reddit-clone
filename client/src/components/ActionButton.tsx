import { ReactNode } from 'react'

interface ActionButton {
    children: Element[] | ReactNode[]
}

export const ActionButton: React.FC<ActionButton> = ({ children }) => {
    return (
        <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
            {children}
        </div>
    )
}
