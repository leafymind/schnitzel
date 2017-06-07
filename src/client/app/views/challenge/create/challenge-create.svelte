<h4>Create</h4>

<ul class="mdl-list">
  <li class="mdl-list__item">
    <div class="mdl-list__item-primary-content">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="title" bind:value="challenge.title" />
        <label class="mdl-textfield__label" for="title">Titel</label>
      </div>
    </div>
  </li>
  <li class="mdl-list__item">
    <div class="mdl-list__item-primary-content">
      <div class="mdl-textfield mdl-js-textfield">
        <textarea class="mdl-textfield__input" rows= "3" bind:value="challenge.desc"></textarea>
        <label class="mdl-textfield__label" for="sample5">Beschreibung...</label>
      </div>
    </div>
  </li>
</ul>

<button type="button" class="mdl-button mdl-button--colored mdl-button--raised" on:tap="create(challenge)">Send</button>

<script>
  import DB from '../../../shared/DB';
  import Session from '../../../shared/Session'
  import { tap } from '../../../shared/component-events';

  export default
  {
    events: { tap },
    data()
    {
      return {
        challenge:
        {
          title: '',
          desc: ''
        }
      };
    },
    methods:
    {
      create(challenge)
      {
        const userCtx = Session.getCachedUser();

        challenge.create_date = Date.now();
        challenge.author = userCtx.name;

        DB.local.challenges.validatingPost(challenge, { userCtx })
          .then(doc =>
          {
            if (!doc.ok || !doc.id)
            {
              console.log(doc);
              throw 'Failed to create challenge';
            }

            return DB.local.quests.validatingBulkDocs
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
