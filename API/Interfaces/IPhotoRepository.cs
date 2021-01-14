using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

public interface IPhotoRepository
{
    Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos();
    Task<Photo> GetPhotoById(int id);
    void RemovePhoto(Photo photo);
}