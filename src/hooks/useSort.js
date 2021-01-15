import { useCallback, useEffect, useState } from 'react';

export const useSort = (data, defaultType = 'none', defaultOrder = 0) => {
    const [sortedData, setSortedData] = useState(data);
    const [sortType, setSortType] = useState(defaultType);
    const [sortOrder, setSortOrder] = useState(defaultOrder); // 0 for no sort, 1 for asc, 2 for desc
    const handleSort = useCallback(
        (type) => {
            if (type) {
                if (sortType === type) {
                    const nextOrder = (parseInt(sortOrder) + 1) % 3;
                    setSortOrder(nextOrder);
                    if (!nextOrder) {
                        setSortType('none');
                    }
                } else {
                    setSortType(type);
                    setSortOrder(1);
                }
            }
        },
        [sortOrder, sortType],
    );

    useEffect(() => {
        const intOrder = parseInt(sortOrder);
        if (intOrder) {
            const sorted = [...data];
            sorted.sort((a, b) => {
                if (a[sortType] > b[sortType]) {
                    return intOrder === 1 ? 1 : -1; //Handling asc and desc sorts.
                } else {
                    return intOrder === 1 ? -1 : 1;
                }
            });
            setSortedData(sorted);
        } else {
            setSortOrder(0);
            setSortType('none');
            setSortedData(data);
        }
    }, [data, sortOrder, sortType]);
    return [sortedData, sortType, sortOrder, handleSort];
};
