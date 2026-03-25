import { useState } from 'react';
function QuickNote() {
 const [note, setNote] = useState('');
 return (
 <div>
 <h3>Nota rapida</h3>
 <input
 value={note}
 onChange={(e) => setNote(e.target.value)}
 />
 <p>Ai scris: {note}</p>
 </div>
 );
}

export default QuickNote;