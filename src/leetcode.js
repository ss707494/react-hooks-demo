/* eslint-disable */
/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
function Node(val, left, right, next) {
  this.val = val;
  this.left = left;
  this.right = right;
  this.next = next;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const data = new TreeNode(1)
data.left = new TreeNode(2)
data.right = new TreeNode(3)
data.left.left = new TreeNode(4)
data.left.right = new TreeNode(5)
data.right.right = new TreeNode(7)

var sumNumbers = function(root) {
  let res = 0
  let helpSum = 0
  let path = []
  let father = root
  while (path.length) {
    res = helpSum * 10 + father.val
    if (father.left) {
      path[path.length] = 'left'
      father = father.left

    } else if (father.right) {

    } else {
      path.splice(path.length - 1, path.length)
      father = path[path.length - 1]
    }
  }
  return res
}

console.log(sumNumbers(data))
