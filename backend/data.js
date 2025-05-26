import axios from 'axios'
import cors from 'cors'
import { createConnection } from 'mysql';
import express from 'express'
import multer from 'multer';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
const app=express()
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use(express.json())
console.log("Server is running on port 3000")
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kinder'
})
//let, const, var 

app.post('/api/accept-babysitter', (req, res) => {
    const { name, email, password } = req.body;

    // Step 1: Insert into babysitter table
    const insertQuery = 'INSERT INTO babysitter (name,email,password) VALUES (?,?,?)';
    connection.query(insertQuery, [name,email,password], (insertErr, insertResults) => {
        if (insertErr) return res.status(500).json(insertErr);

        // Step 2: Delete from users table
        const deleteQuery = 'DELETE FROM users WHERE name = ? AND email = ? AND role = "babysitter"';
        connection.query(deleteQuery, [name, email], (deleteErr, deleteResults) => {
            if (deleteErr) return res.status(500).json(deleteErr);
            return res.json({ message: 'Babysitter accepted and moved successfully!' });
        });
    });
});

app.post('/api/accept-parent', (req, res) => {
    const { name, email, password } = req.body;

    const insertQuery = 'INSERT INTO parent (name, email, password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [name, email, password], (insertErr, insertResults) => {
        if (insertErr) return res.status(500).json(insertErr);
        const deleteQuery = 'DELETE FROM users WHERE name = ? AND email = ? AND role = "parent"';
        connection.query(deleteQuery, [name, email], (deleteErr, deleteResults) => {
            if (deleteErr) return res.status(500).json(deleteErr);
            return res.json({ message: 'Parent accepted and moved successfully!' });
        });
    });
});

app.post('/api/reject-babysitter', (req, res) => {
    const { name, email } = req.body;

    const q = 'DELETE FROM users WHERE name = ? AND email = ? AND role = "babysitter"';
    connection.query(q, [name, email], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: 'Babysitter rejected and removed!' });
    });
});
app.post('/api/reject-parent', (req, res) => {
    const { name, email } = req.body;

    const q = 'DELETE FROM users WHERE name = ? AND email = ? AND role = "parent"';
    connection.query(q, [name, email], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: 'parent rejected and removed!' });
    });
});

app.get('/',(req,res)=>{
    const q = 'select * from users where role = "babysitter" and status = "active"'
    connection.query(q, (err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})
app.get('/parentapprove',(req,res)=>{
    const q = 'select * from users where role = "parent" and status = "active"'
    connection.query(q, (err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})

app.post('/api/register', upload.single('image'), (req, res) => {
  const { name, email, password, role } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = 'INSERT INTO users (name, email, password, role, image) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, password, role, image];

  connection.query(q, values, (err, results) => {
    if (err) {
      console.error('MySQL Error:', err);
      return res.status(500).json({ error: 'Database insert failed.' });
    }
    return res.status(200).json({ message: 'User registered successfully', data: results });
  });
});
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const domain = email.split('@')[1]; // derive from email
    let q = '';
    let values = [email, password];

    if (domain === "kinder.ac.bd") {
        q = 'SELECT * FROM parent WHERE email = ? AND password = ?';
    } else if (domain === "kinder.admin.ac.bd") {
        q = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    } else {
        q = 'SELECT * FROM babysitter WHERE email = ? AND password = ?';
    }

    connection.query(q, values, (err, results) => {
        if (err) return res.json({ message: 'Database error', error: err });

        if (results.length > 0) {
            const name = results[0].name;
            return res.json({ message: 'Login successful', name: name, email: email, id: results[0].id });
        } else {
            return res.json({ message: 'Invalid email or password' });
        }
    });
});

app.post('/api/recording', (req, res) => {
    const {id,names}=req.body
    const q = 'Select * from sitter_record where id = ? and name = ?'
    const values = [id, names]
    connection.query(q,values,(err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})

app.post('/api/postlink',(req, res)=>{
    const {id}=req.body
    const q = 'Select * from class_links where id = ? '
    const values = [id]
    connection.query(q,values,(err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
})

app.post('/api/meetlink', (req, res) => {
  const { sitterid, sittername, link, parentid, parentname } = req.body;
  console.log("Received data:", req.body); // Log the received data

  const q = `
    UPDATE confirmation 
    SET link = ?
    WHERE parent_id = ? AND parent_name = ? AND sitter_id = ? AND sitter_name = ? AND sitter_confirm = 0
  `;

  const values = [link, parentid, parentname, sitterid, sittername];

  connection.query(q, values, (err, results) => {
    if (err) {
      console.error('Error updating link:', err);
      return res.status(500).json({ success: false, message: 'Database error', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'No matching record found to update' });
    }
    return res.status(200).json({ success: true, message: 'Link updated successfully!' });
  });
});


app.post('/api/clearlinks', (req, res) => {
    const { id, name, course, section } = req.body;
  
    const q = `
      UPDATE class_links 
      SET link = '', info = '', WSJTC = ''
      WHERE id = ? AND name = ? AND course = ? AND section = ?
    `;
    const values = [id, name, course, section];
    connection.query(q, values, (err, results) => {
      if (err) {
        console.error('Error updating link:', err);
        return res.status(500).json({ success: false, message: 'Database error', error: err });
      }
      if (results.affectedRows === 0) {
        // No matching record found
        return res.status(404).json({ success: false, message: 'No matching class found to update' });
      }
      return res.status(200).json({ success: true, message: 'Link updated successfully!' });
    });});

app.get('/consultation',(req,res)=>{
    const q = 'Select * from consultation_slots where status=0'
    connection.query(q,(err,results)=>{
        if (err) return res.json(err)
        return res.json(results)
    })
 
})

app.post('/api/payment', (req, res) => {
    const { name, id, amount } = req.body;

    const q = 'INSERT INTO payment (parent_id, parent_name, amount) VALUES (?, ?, ?)';
    const values = [id, name, amount];

    connection.query(q, values, (err, result) => {
        if (err) return res.json({ error: err });
        return res.json({ message: 'Payment successfully!' });
    });
});
app.post('/api/getlink', (req, res) => {
    const { name, id } = req.body;

    const q = 'SELECT link FROM confirmation WHERE parent_id = ? AND parent_name = ?';
    const values = [id, name];

    connection.query(q, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length > 0) {
            console.log('Link found:', result[0].link);
            return res.json({ link: result[0].link });
        } else {
            return res.status(404).json({ error: 'Link not found' });
        }
    });
});
app.get('/api/sitter-location', (req, res) => {
  const q = 'SELECT name,id, latitude, longitude, location FROM babysitter where active = 0';
  connection.query(q, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB Error' });
    if (result.length === 0) return res.status(404).json({ error: 'Not Found' });
    res.json(result);
  });
});
app.post('/api/update-location', (req, res) => {
  const { sitterId, latitude, longitude, availableDays } = req.body;

  const q = 'UPDATE babysitter SET latitude = ?, longitude = ?, days_you_are_free = ?  WHERE id = ?';
  const values = [latitude, longitude,availableDays, sitterId];

  connection.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB Error' });
    res.json({ message: 'Location updated' });
  });
});
app.post('/api/set-status', (req, res) => {
  const { sitterId, active } = req.body;

  const q = 'UPDATE babysitter SET active = ? WHERE id = ?';
  const values = [active, sitterId];

  connection.query(q, values, (err, result) => {
    if (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Status updated successfully' });
  });
});
app.post('/api/confirm-sitter', (req, res) => {
  const { sitterId, sitterName, parentId, parentName, date } = req.body; // Include the date

  const q = `
    INSERT INTO confirmation 
    (sitter_id, sitter_name, parent_id, parent_name, parent_confirm, sitter_confirm, date, link)
    VALUES (?, ?, ?, ?, 1, 0, ?, NULL)
  `;
  const values = [sitterId, sitterName, parentId, parentName, date]; // Add date to the values array

  connection.query(q, values, (err, result) => {
    if (err) {
      console.error("Database error:", err); // Log the error
      return res.status(500).json({ error: "Database error" });
    }

    return res.json({ message: "Confirmation submitted successfully." });
  });
});
app.get('/api/sitter-requests', (req, res) => {
  const sitterId = req.query.sitterId; // Assuming the sitterId is passed as a query parameter.

  const q = `
    SELECT * FROM confirmation
    WHERE sitter_id = ? AND sitter_confirm = 0
  `;
  connection.query(q, [sitterId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(result); // Return the pending requests
  });
});
app.post('/api/confirm-request', (req, res) => {
  const { confirmationId } = req.body; // Confirmation record ID

  const q = `
    UPDATE confirmation
    SET sitter_confirm = 1
    WHERE sitter_id = ?
  `;
  connection.query(q, [confirmationId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json({ message: "Request confirmed successfully." });
  });
});







const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})



