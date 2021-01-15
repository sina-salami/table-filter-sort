class Node {
    constructor(val) {
        this.date = val.date;
        this.ids = [val.id];
        this.left = null;
        this.right = null;
    }
}

export class Bst {
    constructor() {
        this.rootNode = null;
    }

    isAfter(date1, date2) {
        if (date1.getTime() > date2.getTime()) {
            return true;
        }
        return false;
    }

    isSame(date1, date2) {
        if (date1.getTime() === date2.getTime()) {
            return true;
        }
        return false;
    }

    findPosition(root, node) {
        if (this.isAfter(root.date, node.date)) {
            if (root.left === null) {
                root.left = node;
            } else {
                this.findPosition(root.left, node);
            }
        } else {
            if (root.right === null) {
                root.right = node;
            } else {
                this.findPosition(root.right, node);
            }
        }
    }

    insert(val) {
        const existingNode = this.search(this.rootNode, val.date);
        if (existingNode) {
            existingNode.ids.push(val.id);
        } else {
            let newNode = new Node(val);
            if (this.rootNode === null) {
                this.rootNode = newNode;
            } else {
                this.findPosition(this.rootNode, newNode);
            }
        }
    }

    search(root, date) {
        if (root === null) {
            return null;
        } else if (this.isSame(root.date, date)) {
            return root;
        } else if (this.isAfter(root.date, date)) {
            return this.search(root.left, date);
        } else {
            return this.search(root.right, date);
        }
    }

    getRoot() {
        return this.rootNode;
    }
}
