import axios from 'axios';

export async function fetchMinecraftVersions() {
  try {
    const response = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest.json');
    return response.data.versions;
  } catch (error) {
    console.error('Error fetching Minecraft versions:', error);
    return [];
  }
}
