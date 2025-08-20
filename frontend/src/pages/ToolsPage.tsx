import { useEffect, useState } from 'react';
import {BaseUrl as ServerBaseUrl} from "../Server";

type Tool = {
    id: number;
    name: string;
    description: string;
};

function ToolsPage({}) {
    const [tools, setTools] = useState<Tool[]>([]);
    
    useEffect(() => {
        const fetchTools = async () => {
            try {
                const url = ServerBaseUrl + `tools`;
                console.log("Fetching tools from:", url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const body = await response.json();
                setTools(body);
            } catch (error) {
                console.error("Fetch error:", error);
                alert(error);
            }
        };
        fetchTools();
    }, []);

    return (
        <div className="ToolsPage">
            <h1>Tools</h1>
            <ul>
                {tools.map(tool => (
                    <li key={tool.id}>{tool.name} - {tool.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToolsPage;