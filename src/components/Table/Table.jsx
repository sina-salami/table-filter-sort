import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { TableContainer, BaseTable, TableHead, Pagination, Arrow, Error } from './Styled';
import { useSort } from '../../hooks/useSort';

const Table = (props) => {
    const history = useHistory();
    const [page, setPage] = useState(props.params.current.get('page') || 1);
    const [stars, setStars] = useState([]);
    const [sortedData, sortType, sortOrder, handleSort] = useSort(
        props.data,
        props.params.current.get('sortType'),
        props.params.current.get('sortOrder'),
    );

    const changeParams = useCallback(
        (name, value) => {
            props.params.current.set(name, value);
            history.push({ pathname: '/', search: props.params.current.toString() });
        },
        [history, props.params],
    );

    useEffect(() => {
        changeParams('sortType', sortType);
    }, [changeParams, props.params, sortType]);

    useEffect(() => {
        changeParams('sortOrder', sortOrder);
    }, [changeParams, props.params, sortOrder]);

    useEffect(() => {
        changeParams('page', page);
    }, [changeParams, page]);

    useEffect(() => {
        setStars(JSON.parse(localStorage.getItem('stars')) || []);
    }, []);

    const increment = () => {
        if (page < Math.ceil(sortedData.length / 100)) {
            setPage(parseInt(page) + 1);
            changeParams('page', page + 1);
        }
    };
    const decrement = () => {
        if (page > 1) {
            setPage(parseInt(page) - 1);
            changeParams('page', page - 1);
        }
    };

    const handlePageChange = useCallback(
        (e) => {
            if (e.target.value <= Math.ceil(sortedData.length / 100)) {
                setPage(parseInt(e.target.value));
            } else if (e.target.value === '') {
                setPage(1);
            }
        },
        [sortedData.length],
    );

    const handleStar = (id) => {
        const storage = JSON.parse(localStorage.getItem('stars'));
        let newStorage = [];
        if (storage) {
            newStorage = [...storage];
            if (storage.includes(id)) {
                const indexToDelete = newStorage.indexOf(id);
                newStorage.splice(indexToDelete, 1);
            } else {
                newStorage.push(id);
            }
        } else {
            newStorage.push(id);
        }
        localStorage.setItem('stars', JSON.stringify(newStorage));
        setStars(JSON.stringify(newStorage));
    };

    return sortedData.length ? (
        <>
            <TableContainer>
                <BaseTable>
                    <thead>
                        <tr>
                            {props.columns.map((column, index) => (
                                <TableHead
                                    key={`column${index}`}
                                    width={column.width}
                                    onClick={() => handleSort(column.name)}
                                    clickable={!column.title.includes('مقدار')}
                                >
                                    {column.title}
                                    {sortType === column.name && <Arrow order={sortOrder} />}
                                </TableHead>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.slice((page - 1) * 100, (page - 1) * 100 + 100).map((item) => (
                            <tr
                                key={`item${item.id}`}
                                className={'row'}
                                onClick={() => handleStar(item.id)}
                            >
                                <td>
                                    {item.name}
                                    {stars.includes(item.id) && <span>*</span>}
                                </td>
                                <td>{item.date}</td>
                                <td>{item.title}</td>
                                <td>{item.field}</td>
                                <td>{item.old_value}</td>
                                <td>{item.new_value}</td>
                            </tr>
                        ))}
                    </tbody>
                </BaseTable>
            </TableContainer>
            <Pagination>
                <span onClick={decrement}>{'>'}</span>
                <input
                    type={'number'}
                    value={page}
                    onChange={handlePageChange}
                    onFocus={(e) => e.target.select()}
                />{' '}
                of <p>{Math.ceil(sortedData.length / 100)}</p>
                <span onClick={increment}>{'<'}</span>
            </Pagination>
        </>
    ) : (
        <Error>نتیجه ای یافت نشد</Error>
    );
};

export default Table;
