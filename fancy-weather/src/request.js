export default async function makeRequest(query) {
  const url = query;
  try {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  } catch (err) {
    return err;
  }
}
