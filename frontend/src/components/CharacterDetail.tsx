import { useEffect, useState } from "react";
import { getCharacter, updateCharacter } from "../services/CharacterService";

interface CharacterDetailProps {
    characterId: number;
}

interface Character {
    id: number;
    name: string;
    stats: {
        Allgemein?: {
            [key: string]: number;
        };
        Attribute?: {
            [attributeName: string]: {
                Wert: number;
                Fertigkeiten: {
                    [skillName: string]: number;
                };
            };
        };
        [key: string]: any;
    };
    items: string | null;
    notes: string | null;
}

function CharacterDetail({ characterId }: CharacterDetailProps) {
    const [character, setCharacter] = useState<Character | null>(null);
    const [editedStats, setEditedStats] = useState<Object | null>(null);
    const [editedNotes, setEditedNotes] = useState<string>("");
    const [editedItems, setEditedItems] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const loadCharacter = async () => {
        setLoading(true);
        try {
            const data = await getCharacter(characterId);
            if (data.success) {
                setCharacter(data.data);
                setLoading(false);
            } else {
                setError(data.message);
            }
        } catch (err: any) {
            setError("Failed to load character with id " + characterId + ": " + err.message);
        }
    };

    useEffect(() => {
        loadCharacter();
    }, [characterId]);

    useEffect(() => {
        if (character) {
            setEditedStats(JSON.parse(JSON.stringify(character.stats))); // Erstellt echte Kopie
            setEditedNotes(character.notes || "");
            setEditedItems(character.items || "");
        }
    }, [character]);

    const updateByPath = (path: string[], value: number) => {
        setEditedStats((prevStats) => {
            if (!prevStats) return prevStats;

            const updateNested = (obj: any, pathArray: string[]): any => {
                if (pathArray.length === 1) {
                    return { ...obj, [pathArray[0]]: value };
                }
                const [current, ...rest] = pathArray;
                return {
                    ...obj,
                    [current]: updateNested(obj[current], rest),
                };
            };

            return updateNested(prevStats, path);
        });
    };

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (loading) return <div>Loading character...</div>;
    if (!character || !editedStats) return <div>No character selected</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>{character.name}</h2>

            <div style={{ marginTop: "20px" }}>
                <h3>Stats</h3>

                <div style={{ marginBottom: "20px" }}>
                    <button
                        style={{ padding: "5px", fontSize: "12pt", cursor: "pointer" }}
                        onClick={() => {
                            updateCharacter(character.id, {
                                stats: editedStats,
                                notes: editedNotes,
                                items: editedItems,
                            });
                            loadCharacter();
                        }}>
                        Speichern
                    </button>
                    <p id="update-info">
                        {JSON.stringify(editedStats) !== JSON.stringify(character.stats) ||
                        editedNotes !== (character.notes || "") ||
                        editedItems !== (character.items || "")
                            ? "Speichere deine Änderungen!"
                            : "Alles gespeichert!"}
                    </p>
                </div>

                {/* Allgemein Section - bleibt oben */}
                {editedStats.Allgemein && (
                    <div
                        style={{
                            marginBottom: "30px",
                            padding: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                        }}>
                        <h4 style={{ marginTop: 0 }}>Allgemein</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                            {Object.entries(editedStats.Allgemein).map(([key, value]) => (
                                <StatRow key={key} label={key} value={value} onUpdate={updateByPath} path={["Allgemein", key]} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Attribute Section - dynamisches Grid Layout */}
                {editedStats.Attribute && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                            alignItems: "start",
                            marginBottom: "20px",
                        }}>
                        {Object.entries(editedStats.Attribute).map(([attributeName, attributeData]) => (
                            <div
                                key={attributeName}
                                style={{
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    breakInside: "avoid",
                                }}>
                                <h4 style={{ marginTop: 0, marginBottom: "10px", color: "#c06464" }}>{attributeName}</h4>
                                <StatRow label="Wert" value={attributeData.Wert} onUpdate={updateByPath} path={["Attribute", attributeName, "Wert"]} />

                                {attributeData.Fertigkeiten && (
                                    <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                                        <div style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "8px", color: "#666" }}>Fertigkeiten</div>
                                        {Object.entries(attributeData.Fertigkeiten).map(([skillName, skillValue]) => (
                                            <StatRow
                                                key={skillName}
                                                label={skillName}
                                                value={skillValue}
                                                onUpdate={updateByPath}
                                                path={["Attribute", attributeName, "Fertigkeiten", skillName]}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Notes Section */}
                <div
                    style={{
                        marginBottom: "30px",
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}>
                    <h4 style={{ marginTop: 0 }}>Notizen</h4>
                    <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        placeholder="Notizen zum Charakter..."
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontFamily: "inherit",
                            fontSize: "0.95em",
                            resize: "vertical",
                        }}
                    />
                </div>

                {/* Items Section */}
                <div
                    style={{
                        marginBottom: "30px",
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}>
                    <h4 style={{ marginTop: 0 }}>Inventar</h4>
                    <textarea
                        value={editedItems}
                        onChange={(e) => setEditedItems(e.target.value)}
                        placeholder="Items und Ausrüstung..."
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontFamily: "inherit",
                            fontSize: "0.95em",
                            resize: "vertical",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Helper Component für einzelne Stat-Zeile
function StatRow({ label, value, onUpdate, path }: { label: string; value: number; onUpdate: (path: string[], value: number) => void; path: string[] }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <strong style={{ minWidth: "140px", fontSize: "0.95em" }}>{label}:</strong>
            <input
                type="number"
                value={value}
                onChange={(e) => {
                    const newValue = parseInt(e.target.value) || 0;
                    onUpdate(path, newValue);
                }}
                style={{
                    width: "70px",
                    padding: "4px 8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
        </div>
    );
}

export default CharacterDetail;
