# Signal JS

This script monitors popular internet magazines for developers and sends links to a Discord channel when new articles are published. It currently tracks smashingmagazine, reactjs, web-standards, bytes, graphql-weekly, this-week-in-react, and reactjsnews.
## How to run:

1. [Create a Discord channel](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for each internet magazine, titled with the magazine's name (e.g., smashingmagazine, reactjs, webstandards, bytes, reactjsnews).
2. Generate a webhook for each channel you wish to receive updates in.
3. Create a `.env` file at the root with the following format:
```
REACTNEWSLETTER="11012312841142295/AR56zEaOyUaz1sV9eyCsExaqdau-vOOIzma1US69_Sp2uHvxGIf-fECv4fdcR"
REACTSTATUS="REACTSTATUS_CHANNEL_UNIQUE_PATH"
BYTES="BYTES_CHANNEL_UNIQUE_PATH"
SMASHINGMAGAZINE="SMASHINGMAGAZINE_CHANNEL_UNIQUE_PATH"
WEBSTANDARDS="WEBSTANDARDS_CHANNEL_UNIQUE_PATH"
```
4. Install the project with `yarn install`
5. Run `yarn poll` to start the script.

## Input data

1. Mutable issue numbers are stored in the `base.json` file and should be updated every time you post new articles on a Discord server.
2. Immutable data is stored in the NEWS constant within the consts.ts file, structured as follows:
```typescript
const NEWS = [{
  name: "reactnewsletter", // the magazine's name, should match the one in `base.json`
  url: "https://reactnewsletter.com/issues/", // the base URL of the magazine
  webhook: DISCORD_WEBHOOK_URL + REACTNEWSLETTER, // Discord webhook URL + variable from .env file
  trailingSlash: false, // set to `true` if the magazine's URL ends with a slash, otherwise `false`
  ...otherPrivateValues // ignore these
}]
```

## How to add a new magazine

1. Create a new Discord channel and a webhook for it.
2. Add the new webhook path value to the `.env` file.
3. Add the new magazine in the `NEWS` (description above), don't forget to add the same private values `issue`, `updated`, `published`.
4. Add the issue number to the `base.json` file.

## How to add a script to cron scheduler
1. run in project `sudo chmod +x run.sh`
2. `crontab -e`, choose editor, add
```
MAILTO=""

30 15 * * * cd /path/to/js-signal; echo "[ $(date '+\%Y-\%m-\%d \%H:\%M:\%S') ]" >> signal.log 2>&1; ./run.sh >> signal.log 2>&0
```
3. Verify Cron job `crontab -l`

### TODO:

1. Manage RSS channels using [htmlparser2](https://www.npmjs.com/package/htmlparser2)
- https://jster.net/blog/jster-212/
- https://ecmascript.news/archive.html
- https://javascriptkicks.com/articles/631682/jsk-weekly-31-january-2024
- https://us3.campaign-archive.com/?u=4ad274b490aa6da8c2d29b775&id=83f722c2d3
- https://us14.campaign-archive.com/home/?u=809daf9442ece0a92a3d65f99&id=5693c0ed42
2. Try parsing blogs
- https://moderncss.dev/
- https://codemyui.com/strikethrough-text-with-explanations-in-modal-on-hover/

#### Refactoring:

1. Data organization could be improved:
* Input data might be better stored in a separate file.
* Accessing data from the .env file might be streamlined by using the name key from the NEWS item.
2. Consider adding automatic detection for trailing slashes in URL.
3. Organze logging process better (in one string)
