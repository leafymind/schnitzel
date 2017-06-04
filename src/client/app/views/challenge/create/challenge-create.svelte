<h4>Create</h4>

<input type="text" required placeholder="Title" bind:value="challenge.title" />
<input type="text" required placeholder="Author" bind:value="challenge.author_name" />
<input type="text" required placeholder="Description" bind:value="challenge.desc" />

<button type="button" on:tap="create(challenge)">Send</button>

<script>
  import DB from '../../../shared/DB.js';
  import { tap } from '../../../shared/component-events.js';

  export default
  {
    events: { tap },
    data()
    {
      return {
        challenge:
        {
          title: '',
          author_name: '',
          desc: ''
        }
      };
    },
    methods:
    {
      create(challenge)
      {
        console.log(challenge);

        DB.challenges.post(challenge)
          .then(doc =>
          {
            if (!doc.ok || !doc.id)
            {
              console.log(doc);
              throw 'Failed to create challenge';
            }

            return DB.quests.bulkDocs
            ([
              {
                challenge: doc.id,
                type: 'GPS',
                caption: 'Mierendorffplatz',
                coords:
                {
                  latitude: 52.5261584,
                  longitude: 13.3047977,
                  tolerance: 5
                }
              },
              {
                challenge: doc.id,
                caption: 'Königen von Preußen',
                coords:
                {
                  latitude: 52.525672,
                  longitude: 13.293069,
                  tolerance: 5
                }
              }
            ]);
          })
          .catch(console.error.bind())
        ;
      }
    }
  };
</script>
