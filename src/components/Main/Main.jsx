import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Filters } from './Styled';
import Table from '../Table/Table';
import FilterControl from '../FilterControl/FilterControl';
import DATA from '../../data.json';
import { Bst } from '../../Utils';

const Main = () => {
    const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState(DATA);
    const params = useRef(new URLSearchParams(location.search));
    const timer = useRef();
    const binaryTree = useRef(new Bst());

    //We need name for sorting so we don't use it for last two items
    const columns = [
        {
            title: 'نام تغییر دهنده',
            name: 'name',
            width: 15,
        },
        {
            title: 'تاریخ',
            name: 'date',
            width: 10,
        },
        {
            title: 'نام آگهی',
            name: 'title',
            width: 20,
        },
        {
            title: 'فیلد',
            name: 'field',
            width: 5,
        },
        {
            title: 'مقدار قدیمی',
            width: 25,
        },
        {
            title: 'مقدار جدید',
            width: 25,
        },
    ];

    const { name, date, title, field } = {
        name: params.current.get('name') || '',
        date: params.current.get('date') || '',
        title: params.current.get('title') || '',
        field: params.current.get('field') || '',
    };

    useEffect(() => {
        DATA.forEach((item) =>
            binaryTree.current.insert({ id: item.id, date: new Date(item.date) }),
        );
    }, []);

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            let newData = DATA;
            const filters = [];
            const filterObj = { name, title, field };
            if (date) {
                const targetDate = binaryTree.current.search(
                    binaryTree.current.getRoot(),
                    new Date(date),
                );
                if (targetDate) {
                    newData = newData.filter((item) => targetDate.ids.includes(item.id));
                }
            }
            if (name) {
                filters.push('name');
            }
            if (title) {
                filters.push('title');
            }
            if (field) {
                filters.push('field');
            }
            filters.forEach((filter) => {
                newData = newData.filter(
                    (item) => item[filter].toLowerCase().includes(filterObj[filter].toLowerCase()), //toLowerCase handles case sensetivity
                );
            });
            setData(newData);
        }, 300);
        //An intermediate adult types 200 chars in a minute so he types a charachter in 300 ms. if he waits more than that after typing a charachter we start filtering.

        return () => {
            clearTimeout(timer.current);
        };
    }, [date, field, name, title]);

    const handleInputChange = (e) => {
        const name = e.target.name,
            value = e.target.value;

        if (value === '') {
            params.current.delete(name);
        } else {
            params.current.set(name, value);
        }
        history.push({ pathname: '/', search: params.current.toString() });
    };

    return (
        <Container>
            <Filters>
                <FilterControl
                    title={'نام تغییر دهنده'}
                    name={'name'}
                    onChange={handleInputChange}
                    value={name}
                />
                <FilterControl
                    title={'تاریخ'}
                    type={'date'}
                    name={'date'}
                    onChange={handleInputChange}
                    value={date}
                />
                <FilterControl
                    title={'نام آگهی'}
                    name={'title'}
                    onChange={handleInputChange}
                    value={title}
                />
                <FilterControl
                    title={'فیلد'}
                    name={'field'}
                    onChange={handleInputChange}
                    value={field}
                />
            </Filters>
            <Table columns={columns} data={data} params={params} />
        </Container>
    );
};

export default Main;
