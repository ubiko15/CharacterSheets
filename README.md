# PnP API - Projektstruktur

## Verzeichnisstruktur

```
pnp-api/
├── index.php                          # Einstiegspunkt der API
├── config/
│   ├── cors.php                       # CORS-Header Konfiguration
│   └── database.php                   # Datenbankverbindung
├── routes/
│   └── router.php                     # Routing-Logik
└── controllers/
    └── CharacterController.php        # Charakter-bezogene Funktionen
```

## Beschreibung der Dateien

### index.php
- Haupteinstiegspunkt der API
- Lädt alle benötigten Dateien
- Initialisiert Datenbankverbindung und Router

### config/cors.php
- Konfiguriert CORS-Header für Frontend-Zugriff
- Behandelt OPTIONS-Preflight-Requests

### config/database.php
- Database-Klasse für Datenbankverbindung
- Singleton-Pattern für PDO-Verbindung
- Fehlerbehandlung bei Verbindungsproblemen

### routes/router.php
- Router-Klasse verarbeitet alle eingehenden Anfragen
- Entscheidet basierend auf Route und HTTP-Methode
- Delegiert an entsprechende Controller

### controllers/CharacterController.php
- CharacterController behandelt alle Charakter-bezogenen Operationen
- Methoden:
  - `getAllCharacters()` - Gibt alle Charaktere zurück
  - `getCharacterById()` - Gibt einen spezifischen Charakter zurück
  - `updateCharacter()` - Aktualisiert Charakterwerte
  - `createCharacter()` - Erstellt neuen Charakter

## Nächste Schritte

Die TODOs in den Controller-Methoden können nun Schritt für Schritt implementiert werden, ohne die Gesamtstruktur zu verändern.
