<?php

/**
 * DefaultStats.php
 * Startwerte für neue Charaktere (Deutsch)
 */

$defaultStats = [
    // Allgemeine Werte
    "Allgemein" => [
        "Lebenspunkte" => 10,
        "Ausdauer" => 10,
        "Erfahrung" => 0,
        "Level" => 1
    ],

    // Attribute und die zugehörigen Fertigkeiten
    "Attribute" => [
        "Kraft" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Athletik" => 0,
                "Zähigkeit" => 0,
                "Kraftakt" => 0,
                "Nahkampf" => 0
            ]
        ],
        "Geschick" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Heimlichkeit" => 0,
                "Fernkampf" => 0,
                "Technik" => 0
            ]
        ],
        "Reflexe" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Reaktion" => 0,
                "Akrobatik" => 0,
                "Steuerung" => 0
            ]
        ],
        "Verstand" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Naturwissenschaften" => 0,
                "Kulturwissenschaften" => 0,
                "Medizin" => 0,
                "Menschenkenntnis" => 0,
                "Widerstand" => 0
            ]
        ],
        "Präsenz" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Überzeugen" => 0,
                "Lügen" => 0,
                "Einschüchtern" => 0
            ]
        ],
        "Wahrnehmung" => [
            "Wert" => 0,
            "Fertigkeiten" => [
                "Sinnesschärfe" => 0,
                "Orientierung" => 0,
                "Untersuchung" => 0
            ]
        ]
    ]
];

return $defaultStats;