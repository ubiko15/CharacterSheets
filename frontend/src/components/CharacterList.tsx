import { useEffect, useState } from "react";
import { getAllCharacters } from "../services/CharacterService";

interface Character {
    id: number;
    name: string;
    level: number;
    class: string;
}

interface CharacterListProps {
    onSelect: (id: number) => void;
    onAddCharacter: (name: string) => void;
}

function CharacterList({ onSelect, onAddCharacter }: CharacterListProps) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const loadCharacters = async () => {
        setLoading(true);
        try {
            const data = await getAllCharacters();
            if (data.success) {
                setCharacters(data.data);
                setLoading(false);
            } else {
                setError(data.message);
            }
        } catch (err: any) {
            setError("Failed to load characters: " + err.message);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []); // Leeres Array = lädt nur beim ersten Render

    if (loading) return <div>Loading characters...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <h2>Characters</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {characters.map((char) => (
                    <li
                        key={char.id}
                        onClick={() => onSelect(char.id)}
                        style={{
                            padding: "10px",
                            margin: "5px 0",
                            background: "#333",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}>
                        <strong>{char.name}</strong> - Lvl {char.level} {char.class}
                    </li>
                ))}
            </ul>
            <NewCharacter onAddCharacter={onAddCharacter} loadCharacters={loadCharacters}></NewCharacter>
        </div>
    );
}

interface NewCharacterProps {
    onAddCharacter: (name: string) => void;
    loadCharacters: () => void;
}
function NewCharacter({ onAddCharacter, loadCharacters }: NewCharacterProps) {
    const [currentName, setCurrentName] = useState("");

    const handleInputChange = (event) => {
        setCurrentName(event.target.value);
    };

    return (
        <span>
            <input type="text" onInput={handleInputChange} value={currentName}></input>
            <button
                className="plus-button"
                onClick={() => {
                    if (currentName.length >= 3) {
                        console.log(currentName);
                        onAddCharacter(currentName);
                        loadCharacters();
                    }
                }}>
                +
            </button>
        </span>
    );
}

export default CharacterList;
