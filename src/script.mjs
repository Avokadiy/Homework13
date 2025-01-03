export async function fetchUsers () {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Сетевая ошибка');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Ошибка', error);
    }
}

async function main () {
    const userList = await fetchUsers();
    console.log(userList);
    userList.forEach((userList) => console.log(userList.name));
}

main();