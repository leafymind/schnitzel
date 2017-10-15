export default
[
  {
    type: 'GPS',
    caption: 'Begebe dich zum Startpunkt. Bushaltestelle Schlossbrücke in Richtung Zoologischer Garten.',
    coords:
    {
      latitude: 52.52269,
      longitude: 13.2999,
      tolerance: 6
    }
  },
  {
    type: 'LETTERS',
    caption: 'Wer ist das auf dem Bild an der Häuserwand?',
    expect: 'LUISE'
  },
  {
    type: 'GPS',
    caption: 'Finde die Büste von Königin Luise.',
    coords:
    {
      latitude: 52.52564,
      longitude: 13.29309,
      tolerance: 6
    }
  },
  {
    type: 'INPUT',
    caption: 'Wo regierte Königin Luise?',
    expect: 'Preußen'
  },
  {
    type: 'GPS',
    caption: 'Gehe zu der Statue am anderen Ende der Luiseninsel.',
    coords:
    {
      latitude: 52.52446,
      longitude: 13.29336,
      tolerance: 7
    }
  },
  {
    type: 'CHOISE',
    caption: 'Na wer ist das?',
    choises: ['Robin Hood', 'Amor', 'Herkules', 'König Friedrich Wilhelms III. von Preußen'],
    expect: 'Amor'
  },
  {
    type: 'GPS',
    caption: 'Jetzt zur anderen Statue auf der Insel.',
    coords:
    {
      latitude: 52.52527,
      longitude: 13.29306,
      tolerance: 6
    }
  },
  {
    type: 'LETTERS',
    caption: 'Und? Wer ist das?',
    expect: 'VENUS'
  },
  {
    type: 'INPUT',
    caption: 'Übrigens: Was macht Amor, jetzt wo er nicht mehr auf Herzen zielt?',
    expect: ['bogen', 'spiel']
  },
  {
    type: 'GPS',
    caption: 'Ein kleiner Abstecher zum Mausoleum.',
    coords:
    {
      latitude: 52.524,
      longitude: 13.29185,
      tolerance: 6
    }
  },
  {
    type: 'INPUT',
    caption: 'Wann wurde das Mausoleum eröffnet?',
    expect: '1810'
  },
  {
    type: 'GPS',
    caption: 'Finde die Sumpfzypresse.',
    coords:
    {
      latitude: 52.5237,
      longitude: 13.29365,
      tolerance: 45
    }
  },
  {
    type: 'LETTERS',
    caption: 'Wo ist dieser Baum üblicherweise zu finden?',
    expect: 'EVERGLADES'
  },
  {
    type: 'INPUT',
    caption: 'Welchen Umfang hat der Stammfuß?',
    expect: '5,58'
  },
  {
    type: 'GPS',
    caption: 'Auf zum Belvedere!',
    coords:
    {
      latitude: 52.52756,
      longitude: 13.29549,
      tolerance: 5
    }
  },
  {
    type: 'CHOISE',
    caption: 'Was war das Belvedere Ursprünglich mal?',
    choises: ['Jagdhaus und Aussichtsturm', 'Teehaus und Aussichtsturm', 'Porzellanmanufaktur', 'Café und Restaurant'],
    expect: 'Teehaus und Aussichtsturm'
  },
  {
    type: 'INPUT',
    caption: 'Stell dich mit dem Rücken vor die Eingangstür. Welche Zahl steht auf dem roten Schild unter dem B?',
    expect: '6,5'
  },
  {
    type: 'GPS',
    caption: 'Folge dem Weg nach links bis zum Obelisken.',
    coords:
    {
      latitude: 52.52846,
      longitude: 13.29472,
      tolerance: 5
    }
  },
  {
    type: 'INPUT',
    caption: 'Was steht unten auf dem Obelisken?',
    expect: '11 Mars'
  },
  {
    type: 'INPUT',
    caption: 'Wie hoch ist der Obelisk?',
    expect: ['10', 'm']
  },
  {
    type: 'GPS',
    caption: '100m entfernt, Parkausgang, Treppe.',
    coords:
    {
      latitude: 52.52936,
      longitude: 13.29443,
      tolerance: 5
    }
  },
  {
    type: 'INPUT',
    caption: 'Was sagen die Großstadtkinder?',
    expect: 'Hauptsache die Musik ist lauter als die Stimme in deinem Kopf'
  }
]
