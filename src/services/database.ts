import type { Auth } from '@firebase/auth';
import { 
  getDatabase, 
  ref, 
  set, 
  remove, 
  get, 
  child, 
  update
} from 'firebase/database';
import { auth } from './firebase';

interface firebaseTodosProps {
  finished: boolean
  description: string
  id: string
}
export class FirebaseDatabase {

  constructor(auth: Auth, fallbackFunction: () => void) {

    auth.currentUser === null && fallbackFunction();
  }

  async getTodos<T = firebaseTodosProps[]>(uid: string): Promise<T | null>{
    if(uid) {
      const dbRef = ref(getDatabase());
      const data = await get(child(dbRef, `users/${uid}`));
  
      if(data.exists()){
        const firebaseTodos = Object.entries<firebaseTodosProps>(data.val()).map(
          (([key, value]) => {
            return {
              id: key, 
              description: value.description,
              finished: value.finished
            };
          })
        );
  
        return firebaseTodos as unknown as T;
      }
    }
    return null;
  }

  writeUserTodo(
    todoId: string,
    description: string,
    finished: boolean) 
  {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
  
    set(ref(db, `users/${uid}/${todoId}`), {
      description,
      finished
    });
  }

  async changeTodoData(
    todoId: string,
    description: string,
    finished: boolean) 
  {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    
    const updates:Record<string, {
      finished: boolean
      description: string
    }> = {};
  
    updates[`/users/${uid}/${todoId}`] = { 
      finished, 
      description
    };
  
    await update(ref(db), updates);
  }

  deleteTodo(todoId:string) {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    remove(ref(db, `users/${uid}/${todoId}`));
  }
}
