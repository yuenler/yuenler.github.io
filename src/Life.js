import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDwQeZP9KcyU4lW5tWg8_dHaO1SLQsaDA8",
  authDomain: "personal-website-6f0ce.firebaseapp.com",
  projectId: "personal-website-6f0ce",
  storageBucket: "personal-website-6f0ce.appspot.com",
  messagingSenderId: "706404925457",
  appId: "1:706404925457:web:f6aa0eba9af7c5cc6fb1b0",
  measurementId: "G-DGQM1GX3Q8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const withAuthorization = (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in, check permission to view the blog
          const userRef = doc(firestore, 'users', user.uid);
          const docSnapshot = await getDoc(userRef);
          const hasPermission = docSnapshot.exists() && docSnapshot.data().hasPermission;
          if (!docSnapshot.exists()) {
            await setDoc(doc(firestore, 'users', user.uid), {
              name: user.displayName,
              email: user.email,
              hasPermission: false
            });
          }
          setIsAuthenticated(true);
          setHasPermission(hasPermission);
        } else {
          // User is not signed in, deny permission to view the blog
          setIsAuthenticated(false);
          setHasPermission(false);
        }
      });

      return () => unsubscribe();
    }, []);

    if (isAuthenticated && hasPermission) {
      return <WrappedComponent {...props} />;
    }
    else if (isAuthenticated && !hasPermission) {
      return (
        <div>

          <p>You don't currently have permission to view my blog. Text me, and I'll let you in!</p>
          <button
            className='btn btn-outline-light btn-lg btn-block'
            onClick={() => auth.signOut()}
          >Sign out</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>I've never particularly enjoyed writing, but here I am. I'm now a blogger.</h1>
          <p>Please sign in with your Google account to view my writing.</p>
          <button onClick={signInWithGoogle} className="btn btn-outline-light btn-lg btn-block">Sign in with Google</button>
        </div>
      );
    }
  };

  return WithAuthorization;
};

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const Life = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const snapshot = await firestore.collection('blog').get();
      const posts = snapshot.docs.map((doc) => doc.data());
      const sortedPosts = posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setBlogPosts(sortedPosts);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    fetchBlogPosts();

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || currentUser.email !== 'lerchow@gmail.com') {
      return;
    }

    const timestamp = new Date().toISOString();
    const post = {
      timestamp,
      text: newPost,
    };

    await firestore.collection('blog').add(post);

    setNewPost('');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          className='btn btn-outline-light btn-lg btn-block'
          onClick={() => auth.signOut()}
        >Sign out</button>
      </div>
      <h1>Yuen Ler's Blog</h1>
      {currentUser && currentUser.email === 'lerchow@gmail.com' && (
        <form onSubmit={handlePostSubmit} style={{ marginBottom: 50 }}>
          <textarea
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Enter your blog post"
            style={{ fontSize: "medium", width: "80%" }}
          />
          <button type="submit" className='btn btn-outline-light btn-lg btn-block'>Post</button>
        </form>
      )}
      {blogPosts.length > 0 ? (
        <ul>
          {blogPosts.map((post, index) => (
            <div key={index}>
              <div style={{ marginBottom: '20px', paddingLeft: '10px' }}>
                <p style={{ fontSize: '14px', color: '#ffffff', marginBottom: '5px', textAlign: 'left' }}>{formatDate(post.timestamp)}</p>
                <p style={{ fontSize: '18px', lineHeight: '1.5', textAlign: 'left' }}>{post.text}</p>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #ffffff', margin: '20px 0', width: '100%' }} />

            </div>
          ))}
        </ul>
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default withAuthorization(Life);
