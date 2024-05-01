
module.exports = {
  add: async function (req, res) {
    try {
      const { todo } = req.allParams();
      const newTodo = await Todos.create({ todo }).fetch();
      return res.ok(newTodo);
    } catch (error) {
      return res.serverError(error);
    }
  },

  edit: async function (req, res) {
    try {
      const { id, todo } = req.allParams();
      const updatedTodo = await Todos.updateOne({ id }).set({ todo });
      return res.ok(updatedTodo);
    } catch (error) {
      return res.serverError(error);
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.allParams();
      await Todos.destroyOne({ id });
      return res.ok();
    } catch (error) {
      return res.serverError(error);
    }
  },

  search: async function (req, res) {
    try {
      const { keyword } = req.allParams();
      const todos = await Todos.find({ todo: { contains: keyword } });
      return res.ok(todos);
    } catch (error) {
      return res.serverError(error);
    }
  },

  getAll: async function (req, res) {
    try {
      const todos = await Todos.find();
      return res.ok(todos);
    } catch (error) {
      return res.serverError(error);
    }
  },
};
