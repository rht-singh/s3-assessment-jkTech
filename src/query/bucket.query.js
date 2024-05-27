module.exports = {
  getBucketByName: "SELECT * From bucket WHERE bucket_name = '$1'",
  createBucket: 'INSERT INTO bucket (user_id, bucket_name, acl, description)  VALUES ($1, $2, $3, $4) Returning *',
  getBucketList: 'SELECT * FROM bucket where user_id = $5 ORDER BY $1 $2  LIMIT $3 OFFSET $4',
};
