import {useState} from "react";

type UpdateFunction<T> = (index: number, updatedItem: T) => void;
type DeleteFunction = (index: number) => void;
type AddFunction<T> = (item: T) => void;

const useListState = <T,>() => {
    const [list, setList] = useState<T[]>([]);

    const addItem: AddFunction<T> = (item) => setList([...list, item]);

const updateItem: UpdateFunction<T> = (index, updatedItem) => {
    setList(list.map((item, i) => (i === index ? updatedItem : item)));
  };

    const deleteItem: DeleteFunction = (index) => {
        setList(list.filter((_, i) => i !== index));
    }

    return { list, addItem, updateItem, deleteItem };
}

export default useListState;