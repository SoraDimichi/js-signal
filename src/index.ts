import { readFile, writeFile } from 'fs/promises';

const main = async () => {
  try {
    // Read the file base.txt
    const data = await readFile('base.txt', 'utf-8');

    // Find REACTNEWSLETTER and take the number after it
    const match = data.match(/REACTNEWSLETTER (\d+)/);
    if (!match) {
      console.error('REACTNEWSLETTER not found');
      return;
    }

    const issueNumber = parseInt(match[1]) + 1;
    const url = `https://reactnewsletter.com/issues/${issueNumber}`;

    // Fetch the URL
    const response = await fetch(url);

    if (response.status === 404) {
      console.log('Issue not found');
      return;
    }

    if (!response.ok) {
      console.error('Error fetching the URL');
      return;
    }

    // Post the link to the Discord webhook API
    const discordWebhookUrl = 'http://discord.com/webhook';
    const discordResponse = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: url }),
    });

    if (!discordResponse.ok) {
      console.error('Discord API trouble');
      return;
    }

    // If everything is fine, write the new issue number to base.txt
    const newData = data.replace(/REACTNEWSLETTER (\d+)/, `REACTNEWSLETTER ${issueNumber}`);
    await writeFile('base.txt', newData, 'utf-8');
    console.log('Issue number updated');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();