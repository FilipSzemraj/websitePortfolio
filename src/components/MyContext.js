import React, { createContext, useState, useContext } from 'react';

const ActiveProjectContext = createContext();

export function useActiveProject() {
    return useContext(ActiveProjectContext);
}

export const ActiveProjectProvider = ({ children }) => {
    const [activeProject, setActiveProject] = useState(0);

    const value = { activeProject, setActiveProject };

    return (
        <ActiveProjectContext.Provider value={value}>
            {children}
        </ActiveProjectContext.Provider>
    );
};