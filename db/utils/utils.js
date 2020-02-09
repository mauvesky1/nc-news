exports.formatDates = list => {
  //list is an array of objects
  //javacsript date object
  // This utility function should be able to take an array (`list`) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.

  // _hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test_
  let copy = [];

  if (list.length === 0) {
    return copy;
  }

  list.map(function(item) {
    copy.push({ ...item });
  });

  copy.map(function(item) {
    const newDate = new Date(item.created_at);
    item.created_at = newDate;
  });

  return copy;
};

exports.makeRefObj = list => {
  const refObj = {};
  if (list.length !== 0) {
    const listCopy = [...list];
    listCopy.forEach(item => {
      refObj[item.title] = item.article_id;
    });
  }

  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  // Each formatted comment must have:
  // - Its`created_by` property renamed to an`author` key
  //   - Its`belongs_to` property renamed to an`article_id` key
  //     - The value of the new `article_id` key must be the id corresponding to the original title value provided
  //       - Its`created_at` value converted into a javascript date object
  //         - The rest of the comment's properties must be maintained
  let copy = [];
  const copyarticleRef = { ...articleRef };

  if (comments.length === 0) {
    return copy;
  }

  comments.map(function(item) {
    copy.push({ ...item });
  });

  copy.map(function(copiedItem) {
    const newDate = new Date(copiedItem.created_at);

    copiedItem.created_at = newDate;

    copiedItem.author = copiedItem.created_by;
    copiedItem.article_id = copyarticleRef[copiedItem.belongs_to];

    delete copiedItem.belongs_to;
    delete copiedItem.created_by;
  });
  return copy;
};

exports.renameKey = comment => {
  let copy = { ...comment };

  copy[created_by] = copy[username];
  delete copy[username];

  return copy;
};

exports.api_description = () => {
  return JSON.stringify({ api: "your message here" });
};
