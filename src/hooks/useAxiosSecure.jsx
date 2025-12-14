import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"

const Profile = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/users/${encodeURIComponent(user.email)}`)
        .then(res => {
          setProfile(res.data)
        })
        .catch(err => {
          console.log("Profile load error:", err)
        })
    }
  }, [user, loading, axiosSecure])

  const handleUpdate = e => {
    e.preventDefault()

    axiosSecure
      .patch(`/users/${encodeURIComponent(user.email)}`, profile)
      .then(() => {
        setEdit(false)
      })
      .catch(err => console.log(err))
  }

  if (loading || !profile) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="btn bg-[#b71b1c] text-white"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          value={profile.name || ""}
          disabled={!edit}
          onChange={e =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="input w-full"
        />

        <input
          value={profile.email || ""}
          disabled
          className="input w-full bg-gray-200"
        />

        <input
          value={profile.district || ""}
          disabled={!edit}
          onChange={e =>
            setProfile({ ...profile, district: e.target.value })
          }
          className="input w-full"
        />

        <input
          value={profile.upazila || ""}
          disabled={!edit}
          onChange={e =>
            setProfile({ ...profile, upazila: e.target.value })
          }
          className="input w-full"
        />

        <input
          value={profile.bloodGroup || ""}
          disabled={!edit}
          onChange={e =>
            setProfile({ ...profile, bloodGroup: e.target.value })
          }
          className="input w-full"
        />

        {edit && (
          <button className="btn bg-green-600 text-white">
            Save
          </button>
        )}
      </form>
    </div>
  )
}

export default Profile
