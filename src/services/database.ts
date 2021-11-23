import { getDatabase, ref, set, remove, get, child } from "firebase/database";
import { auth } from "./firebase";

interface firebaseTodosProps {
  finished: boolean
  description: string
  id: string
}

export async function getTodos<T = unknown>(uid: string): Promise<T | null>{
  if(uid) {
    const dbRef = ref(getDatabase());
    const data = await get(child(dbRef, `users/${uid}`))

    if(data.exists()){
      const firebaseTodos = Object.entries<firebaseTodosProps>(data.val()).map(
        (([key, value]) => {
          return {
            id: key, 
            description: value.description,
            finished: value.finished
          }
        })
      )

      return firebaseTodos as unknown as T
    }

  }
  return null

}

export function writeUserTodo(
  todoId: string,
  description: string,
  finished: boolean) 
{
  const db = getDatabase();
  const uid = auth.currentUser?.uid

  set(ref(db, `users/${uid}/${todoId}`), {
    description,
    finished
  });
}

export function changeTodoData(
  todoId: string,
  description: string,
  finished: boolean) 
{
  const db = getDatabase()
  const uid = auth.currentUser?.uid
  console.log('aaa')
  set(ref(db, `users/${uid}/${todoId}`), {
    finished,
    description
  });
}

export function deleteTodo(todoId:string) {
  const db = getDatabase();
  const uid = auth.currentUser?.uid
  remove(ref(db, `users/${uid}/${todoId}`))
}