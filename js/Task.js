

var TaskList = function TaskList (spec) {
  spec = spec || {};
  spec.tasks = spec.tasks || [];
  spec.name = spec.name || 'Task List';

  var that = {

    clearAll: function clearAll () {
      localStorage.clear();
      spec.tasks = [];
      return [];
    },
    
    add: function add (task) {
      var newlen = that.tasks.push(task);
      localStorage.setItem(that.name, JSON.stringify(that.tasks));
      return (newlen - 1); // index of new entry
    },
  
    remove: function remove (taskId) {
      var removed = that.tasks.splice(taskId, 1);
      localStorage.setItem(that.name, JSON.stringify(that.tasks));
      return (removed.length > 0) ? true: false;
    },

    get: function get (taskId) {
      return that.tasks[taskId];
    },
  
    getAll: function getAll () {
      return that.tasks;
    },

    getName: function getName () {
      return that.name;
    },
    
//    find: function find (task) {
//      return that.tasks.indexOf(task);
//    },
    
    search: function search (pattern, flags) {
      flags = flags || 'i';
      if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, flags);
      }
      if (! pattern instanceof RegExp) {
        return [];
      } else {
        return that.tasks.filter(function (task) {
          return pattern.test(task.name) || pattern.test(task.details);
        });
      }
    }
  },
  localItems = localStorage.getItem(that.name),
  tmpTasks;

  localStorage.setItem(that.name + ' [VERSION]', 1);

  if (localItems) {
    tmpTasks = JSON.parse(localItems);
    if (tmpTasks instanceof Array) {
      that.tasks = tmpTasks;
    }
  }

  if (typeof Array.prototype.forEach === 'function') {
    // real browser, or IE >=9
    that.forEach = function forEach (fn) {
      that.tasks.forEach(fn);
    };
  } else {
    // last resort - fake it
    that.forEach = function forEach (fn) {
      var len = that.tasks.length,
          i = 0;

      if (typeof fn !== 'function') {
        throw new TypeError();
      }

      for ( ; i < len; i++) {
        fn.call(void 0, that.tasks[i], i, that.tasks);
      }
    };
  }

  return that;
};
