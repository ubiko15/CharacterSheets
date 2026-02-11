import { useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { addCharacterToDatabase } from "./services/CharacterService";

function App() {
    const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

    return (
        <div className="App">
            <h1>Character Sheets</h1>

            <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
                {!selectedCharacterId && (
                    <div style={{ flex: 1 }}>
                        <CharacterList onSelect={setSelectedCharacterId} onAddCharacter={addCharacterToDatabase} />
                    </div>
                )}

                {selectedCharacterId && (
                    <div style={{ flex: 2 }}>
                        <CharacterDetail characterId={selectedCharacterId} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
