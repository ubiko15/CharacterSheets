export async function addCharacterToDatabase(name: string) {
    await fetch(`/api?route=newCharacter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
        }),
    });
}

export async function getAllCharacters() {
    const response = await fetch("/api?route=characters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log(data);
    return data;
}

export async function getCharacter(id: number) {
    console.log("ID: " + id);
    const response = await fetch("/api?route=character&id=" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log(data);
    return data;
}

export async function updateCharacter(id: number, { stats, notes, items }) {
    // POST-Request zum Ändern eines Werts
    console.log("update");
    fetch("/api?route=character", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            stats: stats,
            notes: notes,
            items: items,
        }),
    });
}
